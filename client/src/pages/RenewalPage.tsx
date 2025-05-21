import { useAuth } from "@/store/auth";
import { useState } from "react";
import { useParams } from "react-router"

const RenewalPage = () => {
    const { id } = useParams<{ id: string }>();
    const { organization } = useAuth();
    console.log(id);
    const [loading, setLoading] = useState()


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 text-white">Organization: {organization?.name} </h1>
        </div>
    )
}

export default RenewalPage