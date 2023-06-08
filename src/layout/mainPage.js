import APPBar from '../components/appBar'
import SummerizedBot from '../container/summarizedBot/index'
import { Box } from '@mui/material';



function mainPage() {
  return (
    <>

      <APPBar />
      <Box mt={5}>
        <SummerizedBot />
      </Box>




    </>
  );
}

export default mainPage;
