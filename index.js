document.addEventListener('DOMContentLoaded',generateFriends());
document.getElementById('resetbtn').addEventListener('click',resetForm);
document.getElementById('friendForm').addEventListener('submit',function(e)
{
    //preventing from non-cancled event this case is resetting form
    e.preventDefault();

    //check value in form is not null
    if (!validateForm())
    {
        alert('Please complete the form!');
        return;
    }

    //calling function
    choices();

});

//generate form
function generateFriends()
{
    //random for this scope and not change 
    const randNum = Math.floor(Math.random()*9)+1;
    const container = document.getElementById('friendContainer');
    container.innerHTML = '';

    for( let i = 0; i < randNum; i++)
    {
        const friend = document.createElement('div');
        friend.innerHTML = 
        `
        <label for="friend${i}"> Friend ${i+1}:</label>
        <input type="text" id="friend${i}" name="friend${i}" placeholder="Nickname" required>
        <input type="number" id="age${i}" name="age${i}" placeholder="Age" required>
        <br>
        <br>
        `;

        container.appendChild(friend);
    }
}

function validateForm()
{
    const inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
    return Array.from(inputs).every(input => input.value.trim() != '');
}

function choices()
{
    document.getElementById('next_chioces').innerHTML = 
    `
    <div id="choice_bar">
        <button id="totalbtn" style="background-color: lightgrey;">TotalAge</button>
        <button id="avgbtn" style="background-color: lightgrey;">AverageAge</button>
        <button id="yngbtn" style="background-color: lightgrey;">Youngest</button>
        <button id="oldbtn" style="background-color: lightgrey;">Oldest</button>
    </div>

    <div id="ans_bar">
        <div id="resultsA"></div>
        <div id="resultsB"></div>
        <div id="resultsC"></div>
        <div id="resultsD"></div>
    <div>    
    `;

    // Add event listeners to the buttons
    document.getElementById('totalbtn').addEventListener('click', function() 
    {
        calculateAge('total');
    });

    document.getElementById('avgbtn').addEventListener('click', function() 
    {
        calculateAge('avg');
    });

    document.getElementById('yngbtn').addEventListener('click', function() 
    {
        calculateAge('yng');
    });

    document.getElementById('oldbtn').addEventListener('click', function() 
    {
        calculateAge('old');        
    });
}

let data = {};


function calculateAge(para)
{
    const inputs = document.querySelectorAll('input[type="number"]');
    const ages = Array.from(inputs).map(input => parseInt(input.value));

    const fname = document.querySelectorAll('input[type="text"]');
    const fnames = Array.from(fname).map(input => input.value);

    fnames.forEach((key, index) => {
        data[key] = ages[index];
    });
    
    if( para == 'total')
    {
        const totolAges = ages.reduce((a,b) => a+b, 0);

        document.getElementById('resultsA').innerHTML += 
        `
        <p>Total Age : ${totolAges}</p>      
        `;
    }
    else if(para == 'avg')
    {
        const totolAges = ages.reduce((a,b) => a+b, 0);
        const averageAge = totolAges/ages.length;

        document.getElementById('resultsB').innerHTML += 
        `        
        <p>Average Age : ${averageAge.toFixed(2)}</p>
        `;
    }
    else if(para == 'yng')
    {
        const youngest = ages.indexOf(Math.min(...ages));

        document.getElementById('resultsC').innerHTML += 
        `       
        <p>Youngest Friend(s) : ${ages[youngest]}</p>
        `;

        for (let x in data)
        {
            if(data[x] == ages[youngest])
            {
                document.getElementById('resultsC').innerHTML += 
                `       
                <p>${x}</p>
                `;
            }
        }
    }
    else if(para == 'old')
    {
        const oldest = ages.indexOf(Math.max(...ages));

        document.getElementById('resultsD').innerHTML += 
        `
        <p>Oldest Friend(s) : ${ages[oldest]}</p>        
        `;

        for (let x in data)
        {
            if(data[x] == ages[oldest])
            {
                document.getElementById('resultsC').innerHTML += 
                `       
                <p>${x}</p>
                `;
            }
        }

    }
    
}


function resetForm()
{
    document.getElementById('friendForm').reset();

    if(document.getElementById('resultsA') || document.getElementById('resultsB') || document.getElementById('resultsC') || document.getElementById('resultsD'))
    {
        document.getElementById('resultsA').innerHTML = '';
        document.getElementById('resultsB').innerHTML = '';
        document.getElementById('resultsC').innerHTML = '';
        document.getElementById('resultsD').innerHTML = '';
    }
    
    generateFriends();

}