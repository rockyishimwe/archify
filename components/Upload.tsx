import {type ChangeEvent, type DragEvent, useCallback, useEffect, useRef, useState} from 'react'
import {useOutletContext} from "react-router";
import {AlertCircle, CheckCircle2, ImageIcon, UploadIcon} from "lucide-react";
import AuthRequiredModal from "./AuthRequiredModal";
import {
    ACCEPTED_IMAGE_EXTENSIONS,
    ACCEPTED_IMAGE_TYPES,
    MAX_FILE_SIZE_BYTES,
    MAX_FILE_SIZE_MB,
    PROGRESS_INCREMENT,
    PROGRESS_INTERVAL_MS,
    REDIRECT_DELAY_MS,
} from "../lib/constants";

const isAcceptedType = (type: string) =>
    (ACCEPTED_IMAGE_TYPES as readonly string[]).includes(type);

const validateFile = (file: File): string | null => {
    if (!isAcceptedType(file.type)) return "That file type is not supported. Upload a JPG, PNG, or WebP.";
    if (file.size > MAX_FILE_SIZE_BYTES) return `That file is too large. Maximum size is ${MAX_FILE_SIZE_MB} MB.`;
    return null;
};

const Upload = ({ onComplete, className = '' }: UploadProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [isAuthPromptOpen, setIsAuthPromptOpen] = useState(false);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isMountedRef = useRef(true);

    const { isSignedIn, signIn } = useOutletContext<AuthContext>();

    const handleSignIn = async () => {
        setIsAuthPromptOpen(false);
        try {
            await signIn();
        } catch (e) {
            console.error(`Puter sign in failed: ${e}`);
            setError("Sign in failed. Please try again.");
        }
    };

    const clearTimers = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
            clearTimers();
        };
    }, [clearTimers]);

    const reset = useCallback((message: string | null) => {
        clearTimers();
        if (!isMountedRef.current) return;
        setFile(null);
        setProgress(0);
        setError(message);
    }, [clearTimers]);

    const processFile = useCallback((nextFile: File) => {
        if (!isSignedIn) return;

        const validationError = validateFile(nextFile);
        if (validationError) {
            reset(validationError);
            return;
        }

        // A previous selection may still be running its progress timers.
        clearTimers();

        setError(null);
        setFile(nextFile);
        setProgress(0);

        const reader = new FileReader();

        reader.onerror = () => reset("We could not read that file. Try again.");

        reader.onloadend = () => {
            const base64Data = reader.result as string;

            if (!base64Data) {
                reset("We could not read that file. Try again.");
                return;
            }

            intervalRef.current = setInterval(() => {
                setProgress((prev) => {
                    const next = prev + PROGRESS_INCREMENT;
                    if (next < 100) return next;

                    clearTimers();

                    timeoutRef.current = setTimeout(async () => {
                        timeoutRef.current = null;
                        try {
                            const result = await onComplete(base64Data);
                            // An explicit `false` means the caller failed to accept the
                            // upload; anything else (including void) counts as success.
                            if (result === false) {
                                reset("We could not start your project. Please try again.");
                            }
                        } catch {
                            reset("We could not start your project. Please try again.");
                        }
                    }, REDIRECT_DELAY_MS);

                    return 100;
                });
            }, PROGRESS_INTERVAL_MS);
        };

        reader.readAsDataURL(nextFile);
    }, [isSignedIn, onComplete, reset, clearTimers]);

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        if (!isSignedIn) return;
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (!isSignedIn) return;

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) processFile(droppedFile);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!isSignedIn) return;

        const selectedFile = e.target.files?.[0];
        if (selectedFile) processFile(selectedFile);

        // Allow re-selecting the same file after an error.
        e.target.value = '';
    };

    return (
        <div className={`upload ${className}`.trim()}>
            {!file ? (
                <div
                    className={`dropzone ${isDragging ? 'is-dragging' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={!isSignedIn ? () => setIsAuthPromptOpen(true) : undefined}
                >
                    <input
                        type="file"
                        className="drop-input"
                        accept={ACCEPTED_IMAGE_EXTENSIONS}
                        disabled={!isSignedIn}
                        onChange={handleChange}
                    />

                    <div className="drop-content">
                        <div className="drop-icon">
                            <UploadIcon size={20} />
                        </div>
                        <p>
                            {isSignedIn
                                ? "Click to upload or just drag and drop"
                                : "Sign in to upload a floor plan"}
                        </p>
                        <p className="help">
                            JPG, PNG, or WebP. Maximum {MAX_FILE_SIZE_MB} MB.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="upload-status">
                    <div className="status-content">
                        <div className="status-icon">
                            {progress === 100 ? (
                                <CheckCircle2 className="check" />
                            ) : (
                                <ImageIcon className="image" />
                            )}
                        </div>

                        <h3>{file.name}</h3>

                        <div className='progress'>
                            <div className="bar" style={{ width: `${progress}%` }} />

                            <p className="status-text">
                                {progress < 100 ? 'Analyzing Floor Plan...' : 'Redirecting...'}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <p className="upload-error" role="alert">
                    <AlertCircle size={14} />
                    <span>{error}</span>
                </p>
            )}

            <AuthRequiredModal
                isOpen={isAuthPromptOpen}
                onConfirm={handleSignIn}
                onCancel={() => setIsAuthPromptOpen(false)}
            />
        </div>
    )
}
export default Upload
