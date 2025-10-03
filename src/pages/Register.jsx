import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import app from '../services/firebase';
import logo from '../imgs/logo_nbg.png'
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import { Link } from 'react-router-dom';

import { IoIosEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";

export default function Register() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (password.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        setLoading(true);
        const auth = getAuth(app);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert('Cadastro realizado com sucesso!');
        } catch {
            setError('Erro ao cadastrar. Verifique os dados e tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-lvh w-dvw min-h-screen">
            <HeroSection />

            <div className="flex flex-col justify-center items-center bg-gradient-to-t from-slate-50 via-[#88bbe4] to-slate-50 w-dvw gap-20 lg:bg-none lg:bg-white">
                <img src={logo} alt="Logo EventUp" width={250} height={250}/>


                <div className='flex justify-center'>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-7'>
                        <div>
                            <label htmlFor="username"></label>
                            <input
                            className='border border-[#2E8FE0] w-100 rounded-4xl p-2 placeholder-black focus:outline-none'
                            type="text"
                            id="username"
                            value={username}
                            placeholder='Nome de Usuário'
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            />
                        </div>

                        <div>
                            <label htmlFor="email"></label>
                            <input
                            className='border border-[#2E8FE0] w-100 rounded-4xl p-2 placeholder-black focus:outline-none'
                            type="email"
                            id="email"
                            value={email}
                            placeholder='E-mail'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />
                        </div>

                        <div>
                            <label htmlFor="birthDate"></label>
                            <input
                            className='border border-[#2E8FE0] w-100 rounded-4xl p-2 placeholder-black focus:outline-none'
                            type="date"
                            id="birthDate"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            required
                            />
                        </div>

                        <div className='relative'>
                            <label htmlFor="password"></label>
                            <input
                            className={`border w-100 rounded-4xl p-2 placeholder-black focus:outline-none pr-12 ${
                                password.length > 0 && password.length < 6 ? 'border-red-500' : 'border-[#2E8FE0]'
                            }`}
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            placeholder='Senha (mínimo 6 caracteres)'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2E8FE0] hover:text-[#1a5a9e] focus:outline-none"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <IoIosEyeOff className='cursor-pointer'/> : <IoMdEye className='cursor-pointer'/>}
                            </button>
                        </div>

                        <div className='flex justify-around italic'>
                            <Link className='hover:font-bold' to="/login">
                                Já tem conta? Faça login
                            </Link>
                        </div>


                        <div className='flex flex-col items-center gap-2'>
                            <button 
                                type="submit"
                                className='border border-[#2E8FE0] bg-[#2e90e0] text-white p-3 font-bold text-2xl rounded-4xl w-3xs cursor-pointer hover:bg-[#2e90e09c]'
                                disabled={loading}
                            >{loading ? 'Registrando...' : 'Registrar-se'}</button>
                            {error && <span className='text-red-600 font-bold'>{error}</span>}
                        </div>
                    </form>
                </div>
                
            <Footer/>

            </div>

        </div>
    )
}