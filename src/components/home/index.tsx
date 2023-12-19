import { useDeleteDocsMutation, useGetAllDocsQuery } from '@/Redux/features/ManageDocs/manageDocs.api';
import { IDocs } from '@/Redux/features/ManageDocs/manageDocs.slice';
import Link from 'next/link';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import toast from 'react-hot-toast';

function HomepageComponent() {
    const [deleteDoc, options] = useDeleteDocsMutation()
    const { isError, isSuccess, data } = useGetAllDocsQuery({})
    console.log(isError, isSuccess, data?.data);
    useEffect(() => {
        options.isLoading && toast.loading('Please wait...', {
            id: 'deleteDocs',
        })
        if (options.isSuccess) {
            toast.success(options.data.message, {
                id: 'deleteDocs',
            })
            // dispatch(authenticate(options.data.data))
            console.log(options.data);

            // router.replace('/')
        }

        options.isError && toast.error((options.error as any).data.message, {
            id: 'deleteDocs',
        })
    }, [options])
    return (
        <Table striped bordered hover variant="dark" className='text-center'>
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
                    data?.data.length > 0 && data?.data.map((doc: IDocs, i: number) => (
                        <tr key={i}>
                            <td>{doc._id}</td>
                            <td>{doc.title}</td>
                            <td>
                                <Link href={`/edit-document/${doc._id}`} className='btn btn-outline-warning'>Edit</Link>
                                <Button
                                    onClick={() => deleteDoc(doc._id as string)}
                                    className='ms-3' variant='outline-danger'>Delete</Button>

                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    );
}

export default HomepageComponent;