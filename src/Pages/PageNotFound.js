import React from 'react'

function PageNotFound() {
  return (
    <div 
    style={{
        display:'grid',
        justifyItems:'center'
    }}
    >
        <img src='https://cdn.dribbble.com/users/1175431/screenshots/6188233/404-error-dribbble-800x600.gif'
        style={
            {
                width:'100%',
                height:'88vh'
            }
        }
        />
        
        <button  className='btn btn-primary mt-3'>Back to Home</button>
    </div>
  )
}

export default PageNotFound