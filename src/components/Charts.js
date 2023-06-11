import Bar from './bar'
import Pie2 from './pie2'
import '../css/Charts.css'

function Charts({formdata}) {
  
  return (
    <div className='chart-overbox'>
        <div className='chart-box'>
            <Pie2 data = {formdata}/>
            <h3>Substance wise distribution</h3>
        </div>
        <div className='chart-box bar'>
            <Bar data = {formdata}/>
            <h3>Substance use bar graph</h3>
        </div>
    </div>
  );
}

export default Charts;
