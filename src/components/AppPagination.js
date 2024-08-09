import { TrophyOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const AppPagination = (props) => {
    const { userLevel, maxLevel, handleDisplayLevelChange } = props;

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '80%',
            margin: 'auto'
        }}>
            <Button
                type="primary"
                shape="circle"
                onClick={() => handleDisplayLevelChange(0)}
                style={{
                    background: '#ffc108'
                }}
            >
                <InfoCircleOutlined />
            </Button>
            {
                Array.from({ length: maxLevel }, (_, i) => i + 1).map(v => <Button
                    key={v}
                    style={{
                        background: (v <= userLevel) && (
                            v == userLevel ? '#12caf0' : '#198855'
                        )
                    }}
                    disabled={v > userLevel}
                    type="primary"
                    shape="circle"
                    onClick={() => handleDisplayLevelChange(v)}>
                    {v}
                </Button>)
            }
            <Button
                type="primary"
                shape="circle"
                disabled={userLevel <= maxLevel}
                onClick={() => handleDisplayLevelChange(maxLevel + 1)}
            >
                <TrophyOutlined />
            </Button>
        </div>
    );
}

export default AppPagination;
