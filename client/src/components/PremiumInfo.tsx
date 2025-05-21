import { useAuth } from "@/store/auth";
import { useEffect } from "react";

const PremiumInfo = () => {
    const { organization, getOrganization } = useAuth();

    useEffect(() => {
        getOrganization();
    }, [])

    const remainingDays = (() => {
        const now = new Date();
        const expiry = new Date(organization?.premiumExpiresAt || 0);
        const diff = expiry.getTime() - now.getTime();
        return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    })();

    return organization?.isPremium
        ? <p>✨ Premium active. <span className="text-green-500">{remainingDays}</span> days remaining.</p>
        : <p>⚠️ Premium expired. Please renew. <br /> Please contact to Developers</p>;
};

export default PremiumInfo