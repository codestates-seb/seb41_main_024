import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const QuestionListItem = () => {
  return(
    <>
      <ListItem className="flex-col">
        <div>
          <ListItemText
            // primary={map으로 문의글의 제목이 들어갈 공간}
            sx={{ maxWidth: 390 }}
            primary="N게더 너무 좋은데요?"
            secondary={
              <Typography
                className="text-xs mt-2"
                sx={{ 
                  display: 'inline-block',
                  color: (theme) => theme.palette.primary.main
                }}
                component="span"
                variant="body2"
              >
                {/* map으로 문의글의 내용이 두 줄까지 들어갈 공간 */}
                사용해보니 너무 좋은 경험을 했습니다. 
                제가 발전 제언을 드리고 싶은데 제가 드리는 제안은 다음과 같습니다.
              </Typography>
            }
          />
        <Divider sx={{ maxWidth: 390 }}/>
        </div>
      </ListItem>
    </>
  )
}

export default QuestionListItem;