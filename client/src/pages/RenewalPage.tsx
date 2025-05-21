import { useParams } from "react-router"

const RenewalPage = () => {

    const { id } = useParams<{ id: string }>();
    console.log(id);

    return (
        <div>RenewalPage {id}</div>
    )
}

export default RenewalPage