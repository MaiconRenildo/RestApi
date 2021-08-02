const express=require('express');
const app=express();
const sequelize=require('sequelize');

//Invoca o BodyParser embutido do express a fim de converter o body das requisições
app.use(express.urlencoded({extended:false}))
app.use(express.json())

const GamesController=require("./Games/GamesController")
app.use('/',GamesController); //Habilita o uso das rotas de games

const connection=require("./database/database");
connection  
  .authenticate()
  .then(()=>{
    console.log('Conexão feita com sucesso')
  })
  .catch((msgErro)=>{
    console.log(msgErro)
  });

app.listen(8080,()=>{
  console.log('Servidor rodando')
});


/*
//Busca todos os games
app.get('/games',(req,res)=>{
  Games.findAll({}).then(games=>{
    res.statusCode=200;
    res.json(games);
  }).catch(()=>{
    res.sendStatus(400);
  })
})

//Busca apenas um
app.get('/game/:id',(req,res)=>{
  let id=req.params.id;

  if(isNaN(id)){
    res.sendStatus(400);
  }else{
    Games.findOne({
      where:{
        id:id
      }
    }).then(game=>{
      if(game==null){
        res.sendStatus(404);
      }else{
        res.statusCode=200;
        res.json(game)
      }
    }).catch(()=>{
      res.sendStatus(404);
    })
  }
})

//Cria game
app.post('/game',(req,res)=>{
  let name=req.body.name;
  let price=req.body.price;
  
  if(name==undefined || price==undefined){
    res.sendStatus(404)
  }else{
    if((name.trim()=="" || price.trim()=="") || isNaN(price)==true ){
      res.sendStatus(404)
    }else{
      Games.create({
        name:name,
        price:price
      }).then(()=>{
        res.sendStatus(201);
      }).catch(()=>{
        res.sendStatus(400)
      })
    }
  }
})


//Atualiza game
app.put("/game/:id",(req,res)=>{
  let id=req.params.id
  if(isNaN(id)){
    res.sendStatus(404);
  }else{
    let newName=req.body.name;
    let newPrice=req.body.price;
    let object={}

    if(newPrice==undefined && newName==undefined){
      res.sendStatus(404);
    }else{
      if( (newPrice!=undefined && newPrice.trim()!="") && (isNaN(newPrice)!=true) ) object.price=newPrice;
      if(newName!=undefined && newName.trim()!="") object.name=newName;
    }

    if((Object.entries(object).length==0)){
      res.sendStatus(404);
    }else{
      Games.update(object,{
        where:{
          id:id
        }
      }).then(()=>{
        res.sendStatus(200);
      }).catch(()=>{
        res.sendStatus(404);
      })
    } 
  }
})

app.delete("/game/:id",(req,res)=>{
  let id=req.params.id
  if(isNaN(id)){
    res.sendStatus(400);
  }else{
    Game.destroy({
      where:{
        id:id
      }
    }).then(()=>{
      res.sendStatus(200);
    }).catch(()=>{
      res.sendStatus(400);
    })
  }
})
*/