import React from 'react';


class SearchBar extends React.Component (props){

    constructor(props){
        super(props)
        this.state={
          products:[
          {title:"Zapatillas",description:"MOY fachero",price:"$500",image:"Foto"},
          {title:"Medias",description:"Blancas",price:"$300",image:"Foto"},
          {title:"Muñeca",description:"Medica",price:"$800",image:"Foto"}
          ],
          copyProducts: []    //para no modificar la original
        };
      }
    
      componentDidMount(){    //modifica el estado del producto
        this.initProducts();
      }
    
      initProducts = () => {  //cuando ejecute initProducts, copyProducts genera copia de productos 
        this.setState((state,props) => ({
          copyProducts:[...state.products]
        }));
      }
      
    
      render(){
      return (    //hacer modulo articulos? items?
        <div className="app">
          <Menu title= "Efecto remoto"/>
          <List articulos={this.state.copyProducts} />
         
    
        </div>
      )
      }
    }

export default SearchBar;