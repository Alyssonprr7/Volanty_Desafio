import React from 'react';
import axios from 'axios';
import './forms.css';


export default class Forms extends React.Component{
    constructor(props){
        super(props);
            this.state = {
                marcas: [],
                modelos:[],
                ano:[],
                versao:[],
                carro:[],
                select1:[],
                select2: [],
                select3:[],
                select4:[]
            }
    }


    //Inicializador da Api
    //
    componentDidMount(){
        axios.get('https://volanty-price-api.herokuapp.com/brands/')
            .then(response => {
                const marcas = response.data
                this.setState({marcas})
            })
    }

    //Passar modelos para segundo select
    //
    changeMarca = (marca) =>{
        if(marca!== '') {
            axios.get(`https://volanty-price-api.herokuapp.com/brands/${marca}/models`)
            .then(response => {
                const modelos = response.data
                this.setState({modelos})
                const select1 = marca 
                this.setState({select1})
                console.log(select1)
                const select2 = []
                this.setState({select2})
                const select3 = []
                this.setState({select3})
                const select4 = []
                this.setState({select4})
            })}
        else {
            const modelos = []
            this.setState({modelos})
        }
    }

    //Passar ano para o terceiro select 
    //
    changeModelo = (modelo) =>{
        if(modelo!=='') {
            axios.get(`https://volanty-price-api.herokuapp.com/brands/${this.state.select1}/models/${modelo}/years`)
            .then(response => {
                const ano = response.data
                this.setState({ano})
                const select2 = modelo 
                this.setState({select2})
                console.log(select2)
                const select3 = []
                this.setState({select3})
                const select4 = []
                this.setState({select4})
            })}
        else{
            const ano = []
            this.setState({ano})
        }
    }


    //Passar versao para o quarto select
    //
    changeAno = (ano) =>{
        if(ano!=='') {
            axios.get(`https://volanty-price-api.herokuapp.com/brands/${this.state.select1}/models/${this.state.select2}/years/${ano}/versions`)
            .then(response => {
                const versao = response.data
                this.setState({versao})
                const select3 = ano
                this.setState({select3})
                console.log(select3)
                const select4 = []
                this.setState({select4})
            })}
        else{
            const versao = []
            this.setState({versao})
        }
    }

    //Passar todos os dados para state final
    //
    changeVersao = (version_id) =>{
        if(version_id!=='') {
            axios.get(`https://volanty-price-api.herokuapp.com/brands/${this.state.select1}/models/${this.state.select2}/years/${this.state.select3}/versions/${version_id}`)
            .then(response => {
                const carro= response.data
                this.setState({carro})
                const select4 = version_id
                this.setState({select4})
                console.log(carro)
            })}
        else{
            const select4 = []
            this.setState({select4})
        }
    }

    //Formatar Preço
    //
    currenzialize = (value) => {
        if (value !== undefined){
            let formated = parseFloat(value)
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            let [int, decimal] = formated.split('.');
            let newformated = `${int.replace(',', '.')},${decimal}`
            return newformated;
        }
     }        
    
        

    render() {
        return(
            <div className="main">
                <div className= "top" >
                    <h1>Quanto vale seu carro?</h1>
                    <img src = "https://logodownload.org/wp-content/uploads/2019/08/volanty-logo-1.png"/>
                    <h2>Basta preencher que a Volanty te responde!</h2>
                </div>
                <div className = "form-content">
                    <form>

                        <select id = "brand" value= {this.state.select1} onChange = {(e) => {this.changeMarca(e.target.value)}}>
                            <option value = '' >Marca</option>
                            {this.state.marcas.map(marca => <option key = {marca} value = {marca}>{marca}</option>)}
                        </select><br></br>


                        <select  id = "model" value={this.state.select2}  onChange ={(e) => {this.changeModelo(e.target.value )}} >
                            <option value = "">Modelo</option>
                            {this.state.modelos.map(modelo => <option key={modelo} value = {modelo}>{modelo}</option>)}
                        </select><br></br>


                        <select  id = "year" value={this.state.select3} onChange = {(e) => {this.changeAno(e.target.value)}}>
                            <option value = "">Ano</option>
                            {this.state.ano.map(year => <option key = {year} value = {year}>{year}</option>)}
                        </select><br></br>


                        <select id="version" value = {this.state.select4} onChange = {(e) => {this.changeVersao(e.target.value)}}>
                            <option value = "">Versão</option>
                            {this.state.versao.map(versao => <option value = {versao.versionId} key={versao.version} >{versao.version}</option>)}
                        </select><br></br>
                    </form>
                </div>

                <div className = "elements">
                    <div className = "first-element">
                        <img src = 'https://image.flaticon.com/icons/png/512/2/2087.png'/>
                        <span>MARCA: {this.state.carro.brand}</span>
                    </div>

                    <div className = "second-element">
                        <img src = 'https://image.flaticon.com/icons/png/512/335/335049.png'/>
                        <span>MODELO: {this.state.carro.model}</span>
                    </div>

                    <div className = "third-element">
                        <img src = 'https://image.flaticon.com/icons/png/512/833/833593.png'/>
                        <span>ANO: {this.state.carro.modelYear}</span>
                    </div>

                    <div className = "fourth-element">
                        <img src = 'https://image.flaticon.com/icons/png/512/483/483497.png'/>
                        <span>VERSÃO: {this.state.carro.version}</span>
                    </div>

                    <div className = "fifth-element">
                        <img src = 'https://image.flaticon.com/icons/png/512/112/112548.png'/>
                        <span>PREÇO MÉDIO: R$</span> {this.currenzialize(this.state.carro.precoMedio)}
                    </div>
                </div>
                <button onClick={(e) => {window.location.reload(e)}}>Refazer</button>

            </div>

        )
    }
}

