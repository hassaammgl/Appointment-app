import { useAuth } from "@/store/auth";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/layout/AppLayout";
import { useToast } from "@/components/ui/toast";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";

const RenewalPage = () => {
  const { id } = useParams<{ id: string }>();
  const { organization, renewOrganization, getOrganization } = useAuth();
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getOrganization();
    setLoading(false);
  }, [getOrganization]);
  console.log(id);

  const handleRenew = async () => {
    setLoading(true);
    try {
      await renewOrganization(id);
      success("You're  in! 🎉");
      setLoading(false);
      navigate("/profile");
    } catch (err) {
      const message =
        (err as AxiosError<{ message?: string }>)?.response?.data?.message ??
        (err as Error)?.message ??
        "Login failed 😵";
      error(message);
      setLoading(false);
    }
  };

  return (
    <AppLayout allowedRoles={["ceo"]}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-4 text-white">
            Organization{" "}
            <span className="text-primary">{organization?.name}</span>
          </h1>
          <p className="text-muted-foreground">
            Renewal Page for{" "}
            <span className="text-primary">{organization?.name}</span>
          </p>
        </div>
      </div>
      <div className="container mx-auto p-4">
        {loading ? (
          <h1 className="text-white">Loading....</h1>
        ) : (
          <div>
            <Button onClick={handleRenew}>Renew</Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default RenewalPage;
