const Thought = require('../models/Thought')
const User = require('../models/User')

module.exports = class ThoughtController {
    static async showThoughts(req, res) {

        res.render('thoughts/home')
    }

    static async dashboard(req, res){
        const userId = req.session.userid

        const user = await User.findOne({where: {id: userId}, include: Thought, plain: true })

        if(!user){
            res.redirect('/login')
        }

        const thoughts = user.Thoughts.map((result) => result.dataValues)

        res.render('thoughts/dashboard', {thoughts})
    }

    static createThought(req, res){
        res.render('thoughts/create')
    }

    static async createThoughtSave(req, res){
        const thought = {
            title: req.body.title,
            UserId: req.session.userid
        }

        try{

            await Thought.create(thought)
            
            req.flash('message', 'Pensamento criado com sucesso!')
            
            req.session.save(() => {
                res.redirect('/thoughts/dashboard')
            })
        }catch(err){
            console.log(err)
        }
    }
    
    static async removeThought(req, res){
        const id = req.body.id
        const userId = req.session.userid

        try {
            await Thought.destroy({where: {id: id, UserId: userId}})

            req.flash('message', 'Pensamento removido com sucesso!')
            
            req.session.save(() => {
                res.redirect('/thoughts/dashboard')
            })

        } catch (error) {
            console.log(error)
        }
    }
}