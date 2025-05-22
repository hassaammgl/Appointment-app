import { useAuth } from "@/store/auth";
import { useState, useEffect } from "react";
import { useParams } from "react-router"
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/layout/Applayout";

const RenewalPage = () => {
    const { id } = useParams<{ id: string }>();
    const { organization, renewOrganization, getOrganization } = useAuth();
    console.log(id);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        getOrganization()
        setLoading(false)
    }, [getOrganization])

    const handleRenew = async () => {
        setLoading(true)
        await renewOrganization(id)
        setLoading(false)

    }

    return (
        <AppLayout allowedRoles={["ceo"]}>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold mb-4 text-white">Organization: {organization?.name} </h1>
                    <p className="text-muted-foreground">
                        Renewal Page for {organization?.name}
                    </p>
                </div>
            </div>
            <div className="container mx-auto p-4">
                {
                    loading ? <h1 className="text-white">Loading....</h1> :
                        <div>

                            <Button onClick={handleRenew}>Renew</Button>
                            {id}
                        </div>
                }
            </div>
        </AppLayout>
    )
}

export default RenewalPage