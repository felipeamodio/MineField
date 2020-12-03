//função para retornar as linhas e colunas do jogo
//Array() - posso passar a quantidade de coisas dentro dos ()
// .fill() qual o conteúdo vai mostrar do array
// .map() posso passar uma função para retornar um valor final do array



const createBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, column) => {
            return{ //criando um objeto com atributos
                row: row,
                column: column,
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines: 0
            }
        })
    })
}



//função para espalhar as minas dentro do campo

const spreadMines = (board, minesAmount) => {
    const rows = board.length
    const columns = board[0].length
    let minesPlanted = 0
    while(minesPlanted < minesAmount){
        const rowSel = parseInt(Math.random() * rows, 10)
        const columnSel = parseInt(Math.random() * columns, 10)
   
    //if se um campo já estiver minado ele vai procurar outro p/ plantar a bomba
        if(!board[rowSel] [columnSel].mined){
            board[rowSel][columnSel].mined = true
            minesPlanted++
        }
    }
}

//criar um tabuleiro com as minas plantadas

const createMineBoard = (rows, columns, minesAmount) => {
    const board = createBoard(rows, columns)
    spreadMines(board, minesAmount)
    return board
}

const cloneBoard = board => {
    return board.map(rows => {
        return rows.map(field => {
            return {...field}
        })
    })
}

const getNeighbors = (board, row, column) => {
    const neighbors = []
    const rows = [row - 1, row, row + 1]
    const columns = [column - 1, column, column + 1]
    rows.forEach(r => {
        columns.forEach(c => {
            const diferent = r !== row || c !== column
            const validRow = r >= 0 && r < board.length
            const validColumn = c >= 0 && c < board[0].length
            if(diferent && validRow && validColumn){
                neighbors.push(board[r][c])
            }
        })
    })
    return neighbors
}

const safeNeighborhood = (board, row, column) => {
    const safes = (result, neighbor) => result && !neighbor.mined
    return getNeighbors(board, row, column).reduce(safes, true)
}

//abrindo o campo de forma recursiva

const openField = (board, row, column) => {
    const field = board[row][column]
    if(!field.opened){
        field.opened = true
        if(field.mined){
            field.exploded = true
        }else if(safeNeighborhood(board, row, column)){
            getNeighbors(board, row, column)
            .forEach(n => openField(board, n.row, n.column))
        } else{
            const neighbors = getNeighbors(board, row, column)
            field.nearMines = neighbors.filter(n => n.mined).length
        }
    }
} 


const fields = board => [].concat(...board)
const hadExplosion = board => fields(board)
.filter(field => field.exploded).length > 0
const pendding = field => (field.mined && !field.flagged) || (!field.mined && !field.opened)
const wonGame = board => fields(board).filter(pendding).length === 0
const showMines = board => fields(board).filter(field => field.mined)
.forEach(field => field.opened = true)

//função para marcar com a bandeira
const invertFlag = (board, row, column) => {
    const field = board[row][column]
    field.flagged = !field.flagged
}

//calcular quantas flags foram usadas
const flagsUsed = board => fields(board).filter(field => field.flagged).length

export {
    createMineBoard,
    cloneBoard,
    openField,
    hadExplosion,
    wonGame,
    showMines,
    invertFlag,
    flagsUsed
}