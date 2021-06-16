import React from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    FlatList,
    StyleSheet,
} from 'react-native';

import AccountManager from '../util/AccountManager';
import GenericContainer from '../components/GenericContainer';
import CategoryView from './../components/CategoryView';

import {SliderHuePicker} from 'react-native-slider-color-picker';
import tinycolor from 'tinycolor2';
import Header from './../components/Header';

export default class Categorias extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryName: '',
            id: '',
            categoriesList: [],
            categoryColor: 'rgba(255, 0, 0, 0.5)',
        };
    }

    componentDidMount() {
        this.getAllCategories();
    }

    render = () => (
        <View style={{flex: 1, backgroundColor: '#DDE5DD'}}>
            <Header text="Gerenciador de Categorias" />

            <GenericContainer visible={true}>
                <Text>Criar nova Categoria</Text>
                <TextInput
                    placeholder="Nome da categoria"
                    value={this.state.categoryName}
                    onChangeText={(text) => this.setState({categoryName: text})}
                />

                <Text>Cor: {this.state.categoryColor}</Text>
                <View style={{padding: 15, marginBottom: 5}}>
                    <SliderHuePicker
                        oldColor={this.state.oldColor}
                        trackStyle={Style.trackStyle}
                        thumbStyle={Style.thumb}
                        useNativeDriver={true}
                        onColorChange={this.changeColor}
                    />
                </View>
                <Button title="Criar Categoria" onPress={this.createCategory} />
            </GenericContainer>

            <View style={{flex: 1}}>
                <FlatList
                    data={this.state.categoriesList}
                    renderItem={({item}) => (
                        <CategoryView
                            categoryObj={item}
                            deleteFn={(id) => this.deleteCategory(id)}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </View>
    );

    createCategory = () => {
        const cat = AccountManager.createCategory({
            name: this.state.categoryName,
            color: this.state.categoryColor,
        });
        console.log(cat);
        this.setState({categoryName: ''});
        this.getAllCategories();
    };

    getAllCategories = () => {
        const cat = AccountManager.getAllCategories();
        console.log(cat);
        this.setState({categoriesList: cat});
    };

    getCategory = () => {
        const cat = AccountManager.getCategory(this.state.id);
        console.log(cat);
    };

    deleteCategory = (id) => {
        AccountManager.deleteCategory(id);
        this.getAllCategories();
    };

    changeColor = (colorHsvOrRgb, resType) => {
        if (resType === 'end') {
            this.setState({
                categoryColor: tinycolor(colorHsvOrRgb)
                    .setAlpha(0.5)
                    .toRgbString(),
            });
        }
    };
}

const Style = StyleSheet.create({
    thumb: {
        width: 20,
        height: 20,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 0.35,
    },
    trackStyle: {
        height: 12,
        width: 300,
    },
});
