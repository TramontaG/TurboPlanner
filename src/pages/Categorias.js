import React from 'react';
import {View, Text, Button, TextInput} from 'react-native';

import AccountManager from '../util/AccountManager';


export default class Categorias extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            categoryName: '',
            id: '',
        }
    }

    render = () => (
        <View>
            <Text>Categorias</Text>

            <TextInput 
                placeholder="Category Name"
                value={this.state.categoryName}
                onChangeText={text => this.setState({categoryName: text})}
            />
            <Button title="Create Category" onPress={this.createCategory}/>
            <Button title="GetAll Category" onPress={this.getAllCategories}/>
            <Button title="DeleteAll Categ" onPress={this.deleteAllcategories}/>
            
            <TextInput 
                placeholder="Category Id"
                value={this.state.id}
                onChangeText={text => this.setState({id: text})}
            />
            <Button title="Get Categ" onPress={this.getCategory}/>
            <Button title="Delete Categ" onPress={this.deleteCategory}/>
        </View>
    );

    createCategory = () => {
        const cat = AccountManager.createCategory({
            name: this.state.categoryName,
        });
        console.log(cat);
    }

    getAllCategories = () => {
        const cat = AccountManager.getAllCategories();
        console.log(cat);
    }

    deleteAllcategories = () => {
        AccountManager.deleteAllCategories();
    }

    getCategory = () => {
        const cat = AccountManager.getCategory(this.state.id);
        console.log(cat)
    }

    deleteCategory = () => {
        AccountManager.deleteCategory(this.state.id);
    }
}