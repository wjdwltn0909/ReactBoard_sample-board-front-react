import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from 'axios'
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Table} from "react-bootstrap";

let ShowOne = () => {
    let [data, setData] = useState({})
    let params = useParams()
    let id = parseInt(params.id)

    let location = useLocation()
    let userInfo = location.state.userInfo
    console.log(userInfo)

    let navigate = useNavigate()
    let goBack = () => {
        navigate(-1)
    }

    let onUpdate = () => {
        navigate('/board/update/' + id, {state: {userInfo: userInfo}})
    }

    useEffect(() => {
        let selectOne = async () => {
            try {
                let resp = await axios.get('http://localhost:8080/board/showOne/' + id, {
                    withCredentials: true
                })
                if (resp.status === 200) {
                    setData(resp.data)
                }
            } catch (e) {
                console.error(e)
            }
        }
        selectOne()
    }, [])

    let onLogOut = async () => {
        let response = await axios.post ('http://localhost:8080/user/logOut', {
            withCredentials: true
        })

        if (response.status === 200) {
            navigate('/')
        }
    }

    return (
        <Container className={"mt-3"}>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <td colSpan={2} className={'text-end'}>
                        <Button onClick={onLogOut}>로그아웃</Button>
                    </td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td colSpan={2}>제목: {data.title}</td>
                </tr>
                <tr>
                    <td colSpan={2}>글번호: {data.id}</td>
                </tr>
                <tr>
                    <td colSpan={2}>작성자: {data.nickname}</td>
                </tr>
                <tr>
                    <td>작성일: {data.entryDate}</td>
                    <td>수정일: {data.modifyDate}</td>
                </tr>
                <tr>
                    <td colSpan={2}>내용</td>
                </tr>
                <tr>
                    <td colSpan={2}>{data.content}</td>
                </tr>
                {data.writerId === userInfo.id ?
                <tr>
                    <td>
                        <Button onClick={onUpdate}>수정하기</Button>
                    </td>
                    <td>
                        <Button>삭제하기</Button>
                    </td>
                </tr>
                : null}
                <tr>
                    <td colSpan={2} className={"text-center"}>
                        <Button onClick={goBack}>뒤로 가기</Button>
                    </td>
                </tr>
                </tbody>
            </Table>
        </Container>
    )
}

export default ShowOne