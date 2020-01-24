import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Modal from '../../components/Modal';
import './style.scss';
import { Icon, Tag } from 'antd';
import { genderIcon, clientApollo, trataLink } from '../../components/utils';
import { getVehicle, getSpecie } from '../../configs/query';


const Details = withRouter(({ history, location }) => {
  const [vehiclesName, setVehiclesName] = useState([])
  const [speciesName, setSpeciesName] = useState([])
  const [speciesLanguage, setSpeciesLanguage] = useState([])

  const {
    name,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender,
    homeworld,
    films,
    species,
    vehicles,
  } = location.state
  useEffect(() => {
    async function getVehicles() {
      let vehiclesName = [];
      await vehicles.map(async link => {
        const name = await getVehicle(clientApollo, trataLink(link))
        vehiclesName = [...vehiclesName, name]
        setVehiclesName(vehiclesName)
      })
    }
    async function getSpecies() {
      let speciesName = [];
      let speciesLanguage = [];

      await species.map(async link => {
        const specie = await getSpecie(clientApollo, trataLink(link))
        speciesName = [...speciesName, specie.name]
        speciesLanguage = [...speciesLanguage, specie.language]
        setSpeciesName(speciesName)
        setSpeciesLanguage(speciesLanguage)

      })
    }
    getSpecies();
    getVehicles();
  }, [])
  
  return (
    <Modal>
      <div className='conteainerDetails'>
        <div className='profileContainer'>
          <div className='titleProfile'>{name}</div>

          <div className='blockProfile'>
            <div>
              <span
                className='titleData'>Height: </span>
              <span className='data'>{height} cm</span>
            </div>
            <div>
              <span className='titleData'>Weight: </span>
              <span className='data'>{mass} Kg</span>
            </div>
            <div>
              <span className='titleData'>Gender: </span>
              <span className='data'>{<Icon type={genderIcon(gender)} />}</span>
            </div>
          </div>
          <div className='blockProfile'>
            <div>
              <span className='titleData'>Birth Year: </span>
              <span className='data'>{birth_year}</span>
            </div>
          </div>

          <div className='blockProfile'>
            <div>
              <span className='titleData'>Hair Color: </span>
              <span className='data'>{hair_color}</span>
            </div>
            <div>
              <span className='titleData'>Skin Color: </span>
              <span className='data'>{skin_color}</span>
            </div>
            <div>
              <span className='titleData'>Eye Color: </span>
              <span className='data'>{eye_color}</span>
            </div>
          </div>
          {vehiclesName.length > 0 && <div className='vehicles'>
            <div className='titleProfile'>Vehicle(s)</div>
            {vehiclesName.map(v => <Tag color='#f50'>{v}</Tag>)}
          </div>}
          {speciesName.length > 0 &&<div className='specie'>
            <div className='titleProfile'>Specie(s)</div>
            {speciesName.map(v => <Tag color='#33cc33'>{v}</Tag>)}
          </div>}
          {speciesLanguage.length > 0 &&<div className='specieLanguage'>
            <div className='titleProfile'>Language(s)</div>
            {speciesLanguage.map(v => <Tag color='#108ee9'>{v}</Tag>)}
          </div>}
        </div>
      </div>
    </Modal>

  )
})


export default (Details)