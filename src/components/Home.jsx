import {useEffect, useState, useContext} from "react";
import { Button } from "@nextui-org/react";
import {AiOutlineDelete} from "react-icons/ai";
import {GrOverview} from "react-icons/gr";
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import {UserContext} from "../App";
import {AllPostsContext} from "../App"




export default function Home() {
    const user = useContext(UserContext);
    const allPosts = useContext(AllPostsContext)
    const notify = () => toast.success("Post Deleted");
    const [currentUserPosts, setCurrentUserPosts] = useState([]);
    const [otherPosts, setOtherPosts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const current = allPosts.filter(post => post.userId === user.id);
        setCurrentUserPosts(current);
        const others = allPosts.filter(post => post.userId !== user.id);
        setOtherPosts(others);
    }, [user, allPosts]);

    const handleView = (post) => {
        navigate(`/posts/${post.id}`, {
            state: {
                post,
                user
            }
        });
    }
    const handleDelete = (post) => {
        const newPosts = currentUserPosts.filter(item => post.id !==  item.id);
        setCurrentUserPosts(newPosts);
        notify();
    }

    let currentUserPostEl = currentUserPosts.map((post, i) => (
            <div key={i} className={"w-96 m-2 rounded-2xl flex flex-col gap-2 p-4 items-center justify-between bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg"}>
                <h1 className={"text-2xl text-center capitalize"}>{post.title}</h1>
                <p>{post.body.slice(0, 100)} ...</p>
                <div className={"flex justify-between w-full"}>
                    <Button onClick={ () => handleView(post)} radius={"full"} size={"sm"} startContent={<GrOverview/>}>View</Button>
                    <Button radius={"full"}
                            size={"sm"}
                            color={"danger"}
                            endContent={<AiOutlineDelete/>}
                            onClick={() => handleDelete (post)}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        )
    ).reverse();
    let otherUsersPostEl = otherPosts.map((post, i) => (
            <div key={i} className={"w-96 m-2 rounded-2xl flex flex-col gap-2 p-2 items-center justify-between bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg"}>
                <h1 className={"text-2xl text-center capitalize"}>{post.title}</h1>
                <p>{post.body.slice(0, 100)} ...</p>
                <div className={"flex justify-between w-full"}>
                    <Button onClick={ () => handleView(post)} radius={"full"} size={"sm"} startContent={<GrOverview/>}>View</Button>
                </div>
            </div>
        )
    );

    return (
        <div>
            <div className={"flex gap-4 flex-col sm:flex-row w-11/12 justify-center p-4 mx-auto"}>
                <div className={"shadow-2xl rounded-3xl"}>
                    <h1 className={"font-roboto text-2xl  m-2 p-2"}>Your Posts</h1>
                    <div className={" bg-opacity-5 flex flex-wrap justify-center w-96 h-[630px] overflow-hidden overflow-y-scroll cursor-grab"}>
                        {currentUserPostEl}
                    </div>
                </div>
                <div className={"cursor-grab rounded-2xl shadow-2xl"}>
                    <h1 className={"font-roboto text-2xl text-center p-2"}>Other Posts</h1>
                    <div className={"shadow-inner-2xl flex flex-wrap justify-center h-[630px] overflow-hidden overflow-y-scroll"}>
                        {otherUsersPostEl}
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
}

