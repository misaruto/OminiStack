import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api';

import './styles.css';
import LogoImg from '../../assets/logo.svg';
import {FiPower, FiTrash2} from 'react-icons/fi';
export default function Profile(){

    const history = useHistory();

    const [incidents, setIncidents] = useState([]);

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('profile',{
            headers:{
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    },[ongId])

    async function handleDelete(id){
        try{
           await api.get(`incidents/${id}`,{
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        }catch(err){
            alert('Erro ao deletar caso');
            console.log(err);
        }

    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={LogoImg} alt="Be the hero"/>
                <span>Bem vinda, {ongName}</span>
                
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                
                <button type="button" onClick={handleLogout}>
                        <FiPower size={18} color="E02041"/>
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                <li key={incident.id}>
                    <strong>Caso: <u>{incident.title}</u></strong>
                    <strong>DESCRICAO: </strong>
                    <p>{incident.description}</p>
                    <strong>VALOR: </strong>
                    <p>
                        {
                        Intl.NumberFormat(
                            'pt-BR',
                            {
                                style: 'currency',
                                currency:'BRL'
                            }).format(incident.value)}
                    </p>
                    <button onClick={() => handleDelete(incident.id)} type="button">
                        <FiTrash2 size={20} color="a8a8b3"/>
                    </button>
                </li>
                ))}
            </ul>
        </div>
    );
}