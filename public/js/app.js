console.log("client side js is loading");





const weahterFrom =  document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2')
   
            weahterFrom.addEventListener('submit',(e)=>{
                messageOne.textContent="Loading location and forecast";
                messageTwo.textContent = "";
                e.preventDefault();
                const location = search.value;
                console.log("testing",location)
                fetch(`http://localhost:3004/weather?address=${location}`)
                .then((response)=>{
                    response.json()
                    .then(data=>{
                        if(data.error)
                        return messageOne.textContent = data.error
                             messageOne.textContent = "Temprature : "+ data.temperature;
                             messageTwo.textContent = "Summary : "+data.summary;
                    })
                })
            });