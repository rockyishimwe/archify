import {useEffect} from "react";
import {AlertTriangle} from "lucide-react";
import Button from "./ui/Button";

const AuthRequiredModal = ({
    isOpen,
    onConfirm,
    onCancel,
    title = "Sign in to continue",
    description = "Roomify stores your floor plans and renders in your own Puter account. Sign in or create a free account to upload a plan.",
    confirmLabel = "Sign in with Puter",
}: AuthRequiredModalProps) => {
    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onCancel();
        };

        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [isOpen, onCancel]);

    if (!isOpen) return null;

    return (
        <div
            className="auth-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-modal-title"
            onClick={onCancel}
        >
            <div className="panel" onClick={(e) => e.stopPropagation()}>
                <div className="icon">
                    <AlertTriangle className="alert" />
                </div>

                <h3 id="auth-modal-title">{title}</h3>
                <p>{description}</p>

                <div className="actions">
                    <Button className="confirm" onClick={onConfirm} fullWidth>
                        {confirmLabel}
                    </Button>

                    <button type="button" className="cancel" onClick={onCancel}>
                        Not right now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthRequiredModal;
