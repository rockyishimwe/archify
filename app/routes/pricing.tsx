import type { Route } from "./+types/pricing";
import {useEffect} from "react";
import {Check} from "lucide-react";
import Navbar from "../../components/Navbar";
import WaitlistForm from "../../components/WaitlistForm";
import {track} from "../../lib/analytics";
import {ANCHOR_PRICE_USD, ANCHOR_TURNAROUND, PRICING_PLANS} from "../../lib/constants";

const TITLE = "Roomify pricing — $5 a plan, not $40 and two days";
const DESCRIPTION =
    "Per-plan and monthly pricing for photoreal 3D floor plans. Priced against what a retouching studio charges, because that is what it replaces.";

export function meta({}: Route.MetaArgs) {
    return [
        { title: TITLE },
        { name: "description", content: DESCRIPTION },
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESCRIPTION },
    ];
}

const Pricing = () => {
    useEffect(() => {
        track("pricing_viewed");
    }, []);

    return (
        <div className="pricing">
            <Navbar />

            <section className="pricing-hero">
                <h1>Priced against the studio, not the toy</h1>
                <p className="subtitle">
                    A retouching studio charges about ${ANCHOR_PRICE_USD} per storey and takes{" "}
                    {ANCHOR_TURNAROUND}. That is the job Roomify replaces, and that is what
                    these numbers are measured against.
                </p>
                <p className="pricing-note">
                    Nothing is charged yet — we are testing these numbers before we build
                    billing. Tell us what you would actually pay.
                </p>
            </section>

            <section className="plans">
                {PRICING_PLANS.map((plan) => (
                    <div key={plan.id} className={`plan ${plan.featured ? "is-featured" : ""}`}>
                        {plan.featured && <span className="plan-flag">Most photographers</span>}

                        <h2>{plan.name}</h2>

                        <p className="plan-price">
                            <strong>{plan.price}</strong>
                            <span>{plan.unit}</span>
                        </p>

                        <p className="plan-summary">{plan.summary}</p>

                        <ul className="plan-features">
                            {plan.features.map((feature) => (
                                <li key={feature}>
                                    <Check size={14} />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <a
                            href={plan.id === "single" ? "/#upload" : "#waitlist"}
                            className="plan-cta"
                            onClick={() => track("pricing_plan_clicked", { plan: plan.id })}
                        >
                            {plan.cta}
                        </a>
                    </div>
                ))}
            </section>

            <section className="pricing-diff">
                <h2>What the free tools do not do</h2>
                <p>
                    There are AI renderers that cost cents. None of them deliver a listing
                    package. These are the things you are actually paying for:
                </p>

                <ul>
                    <li><strong>Bulk upload</strong> — a whole listing at once, not one file at a time</li>
                    <li><strong>Per-listing delivery</strong> — renders grouped and named the way you hand them over</li>
                    <li><strong>White label</strong> — your brand on the output, so you can resell it</li>
                    <li><strong>API access</strong> — wire it into the workflow you already run</li>
                    <li><strong>A fidelity report</strong> — evidence the render matches the plan you sent</li>
                </ul>

                <p className="pricing-note">
                    The compliance label — <em>artist's impression, not to scale</em> — is on
                    every render on every tier, including paid ones. It is not a limitation
                    we sell you out of.
                </p>
            </section>

            <section id="waitlist" className="pricing-waitlist">
                <WaitlistForm
                    source="pricing"
                    title="Bulk upload and white label are not built yet"
                    description="Join the list and we will email you when they ship — and ask you first what they should cost."
                />
            </section>
        </div>
    );
};

export default Pricing;
