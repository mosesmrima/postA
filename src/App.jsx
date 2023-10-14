import './App.css';
import { Routes, Route} from "react-router-dom";
import Home from "./components/Home"
import DetailedPost from "./components/DetailedPost";
import NotFoundPage from "./components/NotFound";
import 'react-toastify/dist/ReactToastify.css';
import {
    Avatar,
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Input,
    Textarea
} from "@nextui-org/react";
import {useEffect, useState, createContext} from "react";
import axios from "axios";
import {toast} from "react-toastify";

export const UserContext = createContext();
export const AllPostsContext = createContext();
export const SetAllPostsContext = createContext();

export default function App() {
    const notify = () => toast.success("Post Created");
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [user, setUser] = useState({});
    const [allPosts, setAllPosts] = useState([]);
    const currentUserID = Math.floor(Math.random() * 10);
    const [newPost, setNewPost] = useState({id: Math.floor(Math.random() * 1000000), userId: currentUserID, title: "", body: ""});
    const [inputTitleTracker, setInputTitleTracker] = useState("");
    const [inputBodyTracker, setInputBodyTracker] = useState("");

    const handleInputChange = event => {
        const { name, value } = event.target;
        if (name === "title") {
            setInputTitleTracker(value);
        } else {
            setInputBodyTracker(value)
        }

        setNewPost({ ...newPost, [name]: value });
    };
    const handleSubmit = event => {
        event.preventDefault();
        setAllPosts([...allPosts, newPost]);
        axios.post('https://jsonplaceholder.typicode.com/posts', allPosts).then(() => notify());
    }

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users/${currentUserID}`).then(res => setUser(res.data))
    }, []);

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/posts").then(res => {
            setAllPosts(res.data)
        });
    }, []);

    return (
        <UserContext.Provider value={user}>
            <AllPostsContext.Provider value={allPosts}>
                <SetAllPostsContext.Provider value={setAllPosts}>
                    <header className={"flex gap-2 justify-between items-center font-roboto m-2 p-2 px-8"}>
                        <Button onClick={onOpen} radius={"full"} color={"primary"}>Create Post</Button>
                        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <form onSubmit={handleSubmit}>
                                            <ModalHeader className="flex items-center flex-col gap-1">New Post</ModalHeader>
                                            <ModalBody>
                                                <Input label={"Title"} placeholder={"Title"} required={true} type={"text"} name={"title"} value={newPost.title} onChange={handleInputChange}/>
                                                <Textarea label={"Post Body"} placeholder={"Write your post"} required={true} type={"text"} name={"body"} value={newPost.body} onChange={handleInputChange}/>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button color="danger" variant="light" onPress={onClose}>Cancel</Button>
                                                <Button isDisabled={(inputTitleTracker === null || inputTitleTracker.match(/^ *$/) !== null) || (inputBodyTracker === null || inputBodyTracker.match(/^ *$/) !== null) } type={"submit"} color="primary" onPress={onClose}>Create</Button>
                                            </ModalFooter>
                                        </form>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                        <div className={"flex items-center gap-6 "}>
                            <div className={"flex gap-2"}>
                                <h3> Welcome</h3>
                                <h1 className={"font-roboto text-l font-bold"}>{user.username}</h1>
                            </div>
                            <Avatar showFallback src='https://images.unsplash.com/broken' />
                        </div>
                    </header>
                    <Routes>
                        <Route path={"/"} element={<Home/>}/>
                        <Route path={"/posts/:id"} element={<DetailedPost/>}/>
                        <Route path={"*"} element={<NotFoundPage/>}/>
                    </Routes>
                </SetAllPostsContext.Provider>
            </AllPostsContext.Provider>
        </UserContext.Provider>
  );
}
