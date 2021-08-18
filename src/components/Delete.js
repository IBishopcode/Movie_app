import React from 'react'
import axios from 'axios'

const Delete = (props) => {
    const {movieId, afterDelete } = props

    const deleteHandler = () => {
        axios.delete("http://localhost:7894/api/users/favorites/" + movieId,{withCredentials: true})
        .then((res) =>
        {
            console.log("Movie deleted: " + movieId)
            console.log(res.data)
            afterDelete(movieId)
        })
        .catch((err) =>
        {console.log(err)})
        
    }
    
    return (
        <button style={ {padding:" 6px 12px",border:"1px solid #1EB8D5 ",backgroundColor:"#1EB8D5", color:"white", fontSize:"16px",fontWeight:"bold"}}type="submit" onClick={e =>deleteHandler()}>
            Delete
        </button>
    )
}

export default Delete