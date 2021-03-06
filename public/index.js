'use strict';

//list of bars
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const bars = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'freemousse-bar',
  'pricePerHour': 50,
  'pricePerPerson': 20
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'solera',
  'pricePerHour': 100,
  'pricePerPerson': 40
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'la-poudriere',
  'pricePerHour': 250,
  'pricePerPerson': 80
}];

//list of current booking events
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4
const events = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'booker': 'esilv-bde',
  'barId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'time': 4,
  'persons': 8,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'booker': 'societe-generale',
  'barId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'time': 8,
  'persons': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'booker': 'otacos',
  'barId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'time': 5,
  'persons': 80,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'eventId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}];

//Step 1
events.forEach(function(i_events)
{
  bars.forEach(function(i_bars)
  {
    if(i_events.barId == i_bars.id)
    {
      i_events.price = i_events.persons*i_bars.pricePerPerson + i_events.time*i_bars.pricePerHour
    }
  });
});

console.log(events);

// Step 2 : Decreasing the price in fuction of the number of people
events.forEach(function(i_events)
{
  bars.forEach(function(i_bars)
  {
    if(i_events.barId == i_bars.id)
    {
      i_events.price = (i_events.persons*i_bars.pricePerPerson + i_events.time*i_bars.pricePerHour)
      if(i_events.persons >= 60)
      {
        i_events.price = i_events.price*0.50
      }
      else if(i_events.persons >= 20)
      {
        i_events.price = i_events.price*0.70
      }
      else if(i_events.persons >= 10)
      {
        i_events.price = i_events.price*0.90
      }

    }
  });
});

console.log(events);

//Step 3 - Computing the commission for the different actors
var commission = 0
events.forEach(function(i_events)
{
  commission = i_events.price*0.30
  i_events.commission.insurance = commission*0.50
  commission *= 0.50
  i_events.commission.treasury = i_events.persons
  commission -= i_events.persons
  i_events.commission.privateaser = commission

});

console.log(events);

//Step 4 - Computing the deductible option (and computing again the commissions)
events.forEach(function(i_events)
{
  if(i_events.options.deductibleReduction == true)
  {
    bars.forEach(function(i_bars)
    {
      if(i_events.barId == i_bars.id)
      {
        i_events.price = (i_events.persons*i_bars.pricePerPerson + i_events.time*i_bars.pricePerHour)
        if(i_events.persons >= 60)
        {
          i_events.price = i_events.price*0.50
        }
        else if(i_events.persons >= 20)
        {
          i_events.price = i_events.price*0.70
        }
        else if(i_events.persons >= 10)
        {
          i_events.price = i_events.price*0.90
        }
        i_events.price += i_events.persons //I think it is more logical to add the deductible option after the discount
      }
    });
  }
  else
  {
    bars.forEach(function(i_bars)
    {
      if(i_events.barId == i_bars.id)
      {
        i_events.price = (i_events.persons*i_bars.pricePerPerson + i_events.time*i_bars.pricePerHour)
        if(i_events.persons >= 60)
        {
          i_events.price = i_events.price*0.50
        }
        else if(i_events.persons >= 20)
        {
          i_events.price = i_events.price*0.70
        }
        else if(i_events.persons >= 10)
        {
          i_events.price = i_events.price*0.90
        }

      }
    });
  }

});

console.log(events);


//Step 5 - To pay the actors
commission = 0

//First, we need to compute the calculation taking in account the deductible option
events.forEach(function(i_events)
{
  commission = i_events.price*0.30
  i_events.commission.insurance = commission*0.50
  commission *= 0.50
  i_events.commission.treasury = i_events.persons
  commission -= i_events.persons
  if(i_events.options.deductibleReduction == true)
  {
    /*
    I add directly to the commission of the website the deductible option
    */
    i_events.commission.privateaser = commission + i_events.persons
  }
  else
  {
    i_events.commission.privateaser = commission
  }
});

var booking_price = 0
actors.forEach(function(i_actors)
{
  booking_price = events.find(x => x.id == i_actors.eventId).price
  i_actors.payment.forEach(function(i_payments)
  {
    switch(i_payments.who)
    {
      case "booker":
        i_payments.amount = booking_price
        break;
      case "bar":
        i_payments.amount = booking_price*0.70
        break;
      case "insurance":
        i_payments.amount = events.find(x => x.id == i_actors.eventId).commission.insurance
        break;
      case "treasury":
        i_payments.amount = events.find(x => x.id == i_actors.eventId).commission.treasury
        break;
      case "privateaser":
        i_payments.amount = events.find(x => x.id == i_actors.eventId).commission.privateaser
        break;
      default:

    }
  });
});

console.log(bars);
console.log(events);
console.log(actors);
