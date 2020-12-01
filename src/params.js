import { Dimensions } from 'react-native';


//criando um parâmetro para definir as medidas
//do jogo

const params = {
    blockSize: 30,
    borderSize: 5,
    fontSize: 15,
    headerRatio: 0.15, //proporção do painel superior na tela 15%
    difficultLevel: 0.1, //percentual de campos q estão na tela...as minas vão ocupar então 10% dos campos
    getColumnsAmount(){
        const width = Dimensions.get('window').width
        return Math.floor(width / this.blockSize)
    },
    getRowsAmount(){
        const totalHeight = Dimensions.get('window').height
        const boardHeight = totalHeight * (1 - this.headerRatio)
        return Math.floor(boardHeight / this.blockSize)
    }
}

export default params