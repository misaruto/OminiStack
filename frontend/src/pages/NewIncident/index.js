import React,{useState} from 'react';

import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api';

import './styles.css';
import { FiArrowLeft } from 'react-icons/fi';

import LogoImg from '../../assets/logo.svg';

export default function NewIncident(){
    
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    async function handleNewIncident(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value,
        };

        try{
            await api.post('incidents',data,{
                headers: {
                    Authorization: ongId,
                }
            });
            history.push('/profile');
        }catch(err){
            alert('Erro ao cadastrar.');
        }
    }

    return (
        <div className="newIncident-container">
        <div className="content">
            <section>
            <img src={LogoImg} alt="Be the hero"/>

            <h1>Cadastrar novo caso</h1>
            <p>
               Cadastrar novo caso detalhadamente para encontrar um heroi para resolve-lo.
            </p>
            <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#e02041"/>
                    Voltar
                </Link>
            </section>
            <form onSubmit={handleNewIncident}>
                <input 
                    type="text" 
                    placeholder="Titulo do Caso"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <textarea
                    type="email" 
                    placeholder="Descrição"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    />
                <input 
                    type="number"
                    placeholder="Valor em R$"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    />
                <button className="button" type="submit">
                    Cadastrar
                </button>
            </form>
        </div>
    </div>
    );
}