import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "./BackButton";
import Spinner from "./Spinner";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const {id}=useParams();
  useEffect(()=>{
    setLoading(true)
      axios.get(`http://localhost:5555/books/${id}`)
      .then((response)=>{
        setTitle(response.data.title)
        setAuthor(response.data.author)
        setPublishYear(response.data.publishyear)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        alert("Error")
      });
  },[])
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishyear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {enqueueSnackbar}=useSnackbar();

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishyear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book edited successfully",{variant:'success'})

        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        enqueueSnackbar("Error",{variant:'error'})

      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label htmlFor="" className="text-xl mr-4 text-gray-500 ">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="border-2 border-gray-500  px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label htmlFor="" className="text-xl mr-4 text-gray-500 ">
            Author
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
            className="border-2 border-gray-500  px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label htmlFor="" className="text-xl mr-4 text-gray-500 ">
            Publish Year
          </label>
          <input
            type="text"
            value={publishyear}
            onChange={(e) => {
              setPublishYear(e.target.value);
            }}
            className="border-2 border-gray-500  px-4 py-2 w-full"
          />
        </div>
            <button className="p-2 bg-sky-300 m-8 " onClick={handleEditBook}>Save</button>
      </div>
    </div>
  );
};

export default EditBook;
