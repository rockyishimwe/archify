import {type FormEvent, useState} from "react";
import {CheckCircle2} from "lucide-react";
import Button from "./ui/Button";
import {track} from "../lib/analytics";
import {WAITLIST_ENDPOINT, WAITLIST_ROLES} from "../lib/constants";

/**
 * Email capture, segmented by role.
 *
 * The role question is not decoration: Phase 1's exit criteria turn on whether
 * listing photographers are actually the buyer. If the list fills with agents
 * or students instead, the beachhead choice is wrong and we want to know from
 * the signups rather than from a guess.
 */
const WaitlistForm = ({ source, title, description }: WaitlistFormProps) => {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<WaitlistRole>("photographer");
    const [status, setStatus] = useState<WaitlistStatus>("idle");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (status === "saving") return;

        const trimmed = email.trim();
        // Browser validation already ran; this only guards a pasted-in blank.
        if (!trimmed) {
            setError("Enter an email address.");
            return;
        }

        setStatus("saving");
        setError(null);

        // Fired first and unconditionally: the analytics event is the record of
        // record for the funnel, and it is the only record at all until an
        // endpoint is configured. The email itself is never put in the event.
        track("waitlist_submitted", { role, source });

        if (!WAITLIST_ENDPOINT) {
            // No collector wired up yet. Telling the visitor "you're on the
            // list" when nothing stored their address would be a lie, so the
            // copy below only promises what actually happened.
            setStatus("done");
            return;
        }

        try {
            const response = await fetch(WAITLIST_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({ email: trimmed, role, source }),
            });

            if (!response.ok) throw new Error(`Waitlist failed: ${response.status}`);

            setStatus("done");
        } catch (e) {
            console.error("Waitlist signup failed: ", e);
            setStatus("idle");
            setError("We could not save that. Please try again.");
        }
    };

    if (status === "done") {
        return (
            <div className="waitlist is-done">
                <CheckCircle2 className="icon" />
                <div>
                    <h3>Thanks — you're on the list</h3>
                    <p>We'll email you when bulk upload is ready. No other mail.</p>
                </div>
            </div>
        );
    }

    return (
        <form className="waitlist" onSubmit={handleSubmit}>
            <div className="waitlist-copy">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>

            <div className="waitlist-fields">
                <label className="field">
                    <span>Email</span>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@studio.com"
                        autoComplete="email"
                    />
                </label>

                <label className="field">
                    <span>What do you do?</span>
                    <select value={role} onChange={(e) => setRole(e.target.value as WaitlistRole)}>
                        {WAITLIST_ROLES.map(({ value, label }) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>
                </label>

                <Button type="submit" disabled={status === "saving"}>
                    {status === "saving" ? "Saving..." : "Join the list"}
                </Button>
            </div>

            {error && <p className="waitlist-error" role="alert">{error}</p>}
        </form>
    );
};

export default WaitlistForm;
