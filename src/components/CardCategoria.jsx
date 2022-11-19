import { Link } from "react-router-dom";

const CardCategoria = ({ imagen, nombreCategoria }) => {
    return (
        <div
            style={{
                backgroundImage: `url(${imagen})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
            className="card"
        >
            <div>
                <Link
                    to=""
                    className="btn btn-categoria font-extrabold text-lg px-3 py-2"
                >
                    {nombreCategoria}
                </Link>
            </div>
        </div>
    );
};

export default CardCategoria;
