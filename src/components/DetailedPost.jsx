import {useLocation} from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    Button,
    CardFooter,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody, Input, Textarea, ModalFooter, useDisclosure
} from "@nextui-org/react"
import {useEffect, useState, useContext} from "react";
import axios from "axios";
import {AllPostsContext, UserContext, SetAllPostsContext} from "../App";
import {AiOutlineEdit} from "react-icons/ai";
import 'react-toastify/dist/ReactToastify.css';



export default function DetailedPost() {
    const [postOwner, setPostOwner] = useState([]);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const { state } = useLocation();
    const user = useContext(UserContext);
    const allPosts = useContext(AllPostsContext);
    const setAllPosts = useContext(SetAllPostsContext);
    const [newPost, setNewPost] = useState({id: state.post.id, userId: user.id, title: state.post.title, body: state.post.body});
    const [inputTitleTracker, setInputTitleTracker] = useState(state.post.title);
    const [inputBodyTracker, setInputBodyTracker] = useState(state.post.body);

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users/${state.post.userId}`).then(res => setPostOwner(res.data))
    }, []);


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
        const index = allPosts.findIndex(post => post.id === state.post.id)
        const newAllPosts = allPosts;
        newAllPosts[index] = newPost;
        setAllPosts(newAllPosts);
        axios.put(`https://jsonplaceholder.typicode.com/posts/${state.post.id}`, allPosts)
    }
    return (
        <div className={"flex items-center justify-center"}>
            <Card className={"flex gap-4 w-6/12 p-4 mx-auto font-roboto text-center"}>
                <CardHeader className={"flex justify-between"}>
                    <div className={"capitalize text-2xl font-bold"}>
                        {newPost.title?newPost.title:state.post.title}
                    </div>
                    {
                        user.id === state.post.userId? <Button onPress={onOpen} size={"sm"} endContent={<AiOutlineEdit/>}>Edit</Button>: <></>
                    }

                    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <form onSubmit={handleSubmit}>
                                        <ModalHeader className="flex items-center flex-col gap-1">New Post</ModalHeader>
                                        <ModalBody>
                                            <Input  label={"Title"} placeholder={"Title"} required={true} type={"text"} name={"title"} value={newPost.title} onChange={handleInputChange}/>
                                            <Textarea label={"Post Body"} placeholder={"Write your post"} required={true} type={"text"} name={"body"} value={newPost.body} onChange={handleInputChange}/>
                                        </ModalBody>
                                        <ModalFooter className={"flex items-center"}>
                                            <Button size={"sm"} color="danger"  onPress={onClose}>Cancel</Button>
                                            <Button size={"sm"} isDisabled={(inputTitleTracker === null || inputTitleTracker.match(/^ *$/) !== null) || (inputBodyTracker === null || inputBodyTracker.match(/^ *$/) !== null) } type={"submit"} color="primary" onPress={onClose}>Save Changes</Button>
                                        </ModalFooter>
                                    </form>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </CardHeader>
                <CardBody className={"text-xl"}>{newPost.title?newPost.body:state.post.body}</CardBody>
                <CardFooter className={"flex justify-end"}>
                    <div>
                        Created by:  {postOwner.username}
                    </div>
                </CardFooter>

            </Card>
        </div>
    );
}