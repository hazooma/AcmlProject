import React from 'react';
import './search.style.css';
import ItemCard from './ItemCard';
import {Component} from 'react';
import {connect} from 'react-redux';
class Search extends Component{
    state = {items:[]}
    componentWillMount(){
      
    }
    render() {
        return(
            <div>
                 <style>{'body { background-color: #F8F9F9}'}</style>
            <div className="itemsBox">
            {this.renderItems()}
            </div>
            </div>
        );
    }

    renderItems = () =>{
        return this.state.items.map(
            (item)=>{
                console.log(item);
                return (<ItemCard name={item.name} place={item.place}/>)
            }
        )
    }
}

function mapStateToProps(state){
    return {searchQuery:state.searchQuery}
}

    

export default connect(mapStateToProps)(Search);