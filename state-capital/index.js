const express = require('express');
const app = express();

app.use(express.json());

const states =[
    { state: 'lagos', capital :'ikeja'},
    { state:'oyo', capital : 'ibadan'},
    { state: 'plateau', capital :'jos'}
]
let output = states.map(c => `'${c.state}':'${c.capital}'`);

app.get('/', (req, res)=>{
    res.send(output);
});

app.post('/', (req,res)=> {
    if (!req.body.state){
        res.status(400).send('Name is required')
    }
    const state = {
        state: req.body.state,
        capital: req.body.capital
    };
    states.push(state);
    res.send(stateOutput(state));
});

app.put('/:state', (req,res)=> {
    let state = states.find(c => c.state == req.params.state)
    if (!state) res.status('404').send('The state does not exist')// 404
    
    state.state = req.body.state
    state.capital = req.body.capital
    res.send(stateOutput(state));
})

app.delete('/:state', (req,res)=> {
    const state = states.find(c => c.state == req.params.state)
    if (!state) res.status('404').send('The state does not exist')// 404
    
    const index = states.indexOf(state);
    states.splice(index, 1);

    res.send(stateOutput(state));
});

function stateOutput(state){
    return `${state.state}: ${state.capital}`
}
// PORT
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`));