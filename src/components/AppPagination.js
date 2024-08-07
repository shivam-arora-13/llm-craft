import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { FloatButton, Button } from 'antd';
import {useState} from 'react';
const AppPagination = () => {
    const [open, setOpen] = useState(true);

  const onChange = (checked) => {
    setOpen(checked);
  };

     const levels = [1, 2, 3, 4, 5];
    const currentLevel = 3;
  return (
    <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '80%',
            margin: 'auto'
        }}>
    {
        levels.map(v => <Button style={{
            background: (v <= currentLevel) && (
                v == currentLevel ? '#12caf0' : '#198855'
            )
        }} disabled={v > currentLevel} type="primary" shape="circle">
        {v}
      </Button>)
    }
    {/* <FloatButton.Group
      trigger="click"
      
      type="primary"
      style={{ insetInlineEnd: 24 }}
      icon={<CustomerServiceOutlined />}
    >
        
      <FloatButton />
      <FloatButton icon={<CommentOutlined />} />
    </FloatButton.Group> */}
    {/* <FloatButton.Group
      trigger="hover"
      type="primary"
      style={{ insetInlineEnd: 94 }}
      icon={<CustomerServiceOutlined />}
    >
      <FloatButton />
      <FloatButton icon={<CommentOutlined />} />
    </FloatButton.Group> */}
  </div>
  );
 
    // return <div style={{
    //     display: 'flex',
    //     flexDirection: 'row',
    //     justifyContent: 'space-evenly'
    // }}>
    //     {levels.map(v => <div style={{
    //         width: '30px',
    //         height: '30px',
    //         color: 'white',
    //         // padding: '0 10px',
    //         borderRadius: '60px',
    //         background: 'grey',
    //         textAlign: 'center'
    //     }}>
    //         <p style={{
    //             margin: 'auto',
    //             padding: 'auto'
    //         }}>{v}</p>
    //     </div>)}
    // </div>
    // <Pagination>
    //     {/* <PaginationItem>
    //         <PaginationLink
    //             first
    //             href="#"
    //         />
    //     </PaginationItem>
    //     <PaginationItem>
    //         <PaginationLink
    //             href="#"
    //             previous
    //         />
    //     </PaginationItem> */}
    //     <PaginationItem style={{
    //         margin: '0 10px',
    //         border: 'none'
    //         // border: '1px solid'
    //         // width: '30px'
    //     }}>
    //         {/* <PaginationLink href="#"> */}
    //             1
    //         {/* </PaginationLink> */}
    //     </PaginationItem>
    //     <PaginationItem>
    //         <PaginationLink href="#">
    //             2
    //         </PaginationLink>
    //     </PaginationItem>
    //     <PaginationItem>
    //         <PaginationLink href="#">
    //             3
    //         </PaginationLink>
    //     </PaginationItem>
    //     <PaginationItem disabled={true}>
    //         <PaginationLink href="#">
    //             4
    //         </PaginationLink>
    //     </PaginationItem>
    //     <PaginationItem disabled={true}>
    //         <PaginationLink href="#">
    //             5
    //         </PaginationLink>
    //     </PaginationItem>
    //     {/* <PaginationItem>
    //         <PaginationLink
    //             href="#"
    //             next
    //         />
    //     </PaginationItem>
    //     <PaginationItem>
    //         <PaginationLink
    //             href="#"
    //             last
    //         />
    //     </PaginationItem> */}
    // </Pagination>
}

export default AppPagination;