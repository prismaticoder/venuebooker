var express = require('express');
var Timetable = require('../models/timetable');
var router = express.Router();

router.get('/venues/free', async (req,res) => {
    //Get all free venues at that particular point in time
    var currTime = new Date().getHours();
    var finalTime = currTime + 1;
    var venues = await Timetable.where('start').ne(currTime).where('end').ne(finalTime);

    if (venues.length > 0) {
        res.json({ok:true,venues});
    }
    else {
        res.status(404).json({ok:true,message:"No available venues for the selected time period"});
    }
})

//Get bookings
router.get('/venues/bookings', async (req, res) => {
    let { start, end } = req.query;

    if (start && end) {
        try {
            let venues = await Timetable.where('start').gte(start).lt(end);
    
            if (venues.length > 0) {
                return res.status(200).json({ok:true,count:venues.length,venues})
            }
            else {
                return res.status(200).json({ok:true,count:0,message:"There are no bookings available for the selected time frame"})
            }
        } catch (error) {
            res.status(400).json({ok:false,error})
        }
    }
    else {
        return res.status(400).json({ok:false,message:"Bad Request"})
    }
    
})

//Create new booking
router.post('/venues/bookings', async (req,res) => {
    try {
        let { day,venue,classes,start,end } = req.body;
        let query = {
            day,venue,class:classes,start,end
        }
        var newVenue = await Timetable.create(query)
        
        res.status(201).json({ok:true,newVenue})
    } catch (error) {
        res.status(400).json({ok:false,message:"Bad Request",error:error.message})
    }
})

module.exports = router;