import {useNavigate, useParams} from "react-router-dom";
import {Container, PageItem, Pagination, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from "axios";

let ShowList = () => {
    let params = useParams()
    let pageNo = params.pageNo

    let [data, setData] = useState({boardList: []})
    let navigate = useNavigate()

    let moveToSingle = (id) => {
        navigate('/board/showOne/' + id)
    }

    let moveToPage = (pageNo) => {
        navigate('/board/showList/' + pageNo)
    }

    useEffect(() => {
        let selectList = async () => {

            let resp = await axios
                .get("http://localhost:8080/board/showList/" + pageNo, {})
                .catch((e) => {
                    console.error(e)
                    window.location.href = '/board/showList/1'
                })

            if (resp.status === 200) {
                setData(resp.data)
            }
        }

        selectList()
    }, [pageNo])


    return (
        <Container className={"mt-3"}>
            <Table hover striped bordered className={"table-danger"}>
                <thead>
                <tr>
                    <td>글 번호</td>
                    <td>제목</td>
                    <td>작성자</td>
                </tr>
                </thead>
                <tbody>
                {data.boardList.map(b => (
                    <TableRow board={b} key={b.id} moveToSingle={moveToSingle}/>
                ))}
                <tr>
                    <td colSpan={3} className={"text-center"}>
                        <MyPagination
                            startPage={data.startPage}
                            endPage={data.endPage}
                            currentPage={data.currentPage}
                            maxPage={data.maxPage}
                            moveToPage={moveToPage}
                        />
                    </td>
                </tr>
                </tbody>
            </Table>
        </Container>
    )
}

let TableRow = ({board, moveToSingle}) => {
    return (
        <tr onClick={() => moveToSingle(board.id)}>
            <td>{board.id}</td>
            <td>{board.title}</td>
            <td>{board.nickname}</td>
        </tr>
    )
}

let MyPagination = ({startPage, endPage, currentPage, maxPage, moveToPage}) => {
    let items = []
    items.push(
        <Pagination.First onClick={() => moveToPage(1)}/>
    )
    for (let i = startPage; i <= endPage; i++) {
        items.push(
            <Pagination.Item key={i} active={i === currentPage} onClick={() => moveToPage(i)}>
                {i}
            </Pagination.Item>
        )
    }
    items.push(
        <Pagination.Last onClick={() => moveToPage(maxPage)}/>
    )
    return (
        <Pagination className={"justify-content-center"}>
            {items}
        </Pagination>
    )
}

export default ShowList