import React from 'react'

export default function HijoBoton({post, hola}) {


    console.log(hola)
    console.log(post)

  return (
    <>
        <h2>hola mamabixo</h2>
        
         {
            post && post.map((item) => 
                (
                    <div key={item.id} className="col-lg-2 col-md-3 col-sm-6 col-6 p-0">
                        <a href={void(0)} onClick={()=>{console.log('...')}} className="box-video" data-url="" data-title={item.title} style={{backgroundImage: "url(https://img.youtube.com/vi/"+item.idYoutube+"/0.jpg)"}}>
                            <span className="overlay"></span>
                            <h2>{item.titulo}</h2> 
                        
                        </a>
                    </div>
                )) 
            
            }   
    
    </>
  )
}
