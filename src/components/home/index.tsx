import { useGetAllDocsQuery } from '@/Redux/features/ManageDocs/manageDocs.api';
import { IDocs } from '@/Redux/features/ManageDocs/manageDocs.slice';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

function HomepageComponent() {
    const { isError, isSuccess, data } = useGetAllDocsQuery({})
    console.log({ isError, isSuccess, data });

    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>id</th>
                    <th>Title</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    data?.data.length === 0 && <tr>
                        <td colSpan={3} className='text-center'>
                            No documents found.
                        </td>
                    </tr>
                }
                {
                    data?.data?.map((doc: IDocs) => {
                        <tr>
                            <td>{doc._id}</td>
                            <td>{doc.titles}</td>
                            <td>
                                <Button variant='outline-warning'>Edit</Button>
                                <Button variant='outline-danger'>Delete</Button>

                            </td>
                        </tr>
                    })
                }
            </tbody>
        </Table>
    );
}

export default HomepageComponent;