document.querySelector('form').addEventListener('submit',e=>{
    e.preventDefault();
document.querySelector('#forecast').textContent = "loading..."
document.querySelector('#location').textContent = ''
    
    fetch(`http://localhost:3000/weather?address=${document.querySelector('input').value}`).then((res) => {

    res.json().then(data => {
        if (data.error) {
            
            document.querySelector('#forecast').textContent = data.error
        } else {
            document.querySelector('#forecast').textContent = data.forecast;
            document.querySelector('#location').textContent = data.location;

        }

document.querySelector('input').value=''
    })
})
})