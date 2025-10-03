import { getAuth, signOut } from "firebase/auth";
import app from "../../services/firebase";

export default function Button() {

    const handleLogout = async () => {
        try {
            const auth = getAuth(app);
            await signOut(auth);
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };


    return(
            <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
                Sair
            </button>
    )
}