import './css/report_detail.css'
export const ReportDetail = (props) => {
    return (
      <div className='report-detail'>
        {props.children}
      </div>
    );
  };

export const ReportHeader = ({header}) => {
    return (
      <div id="header">
        {header}
      </div>
    );
  };
export const ReportContent = ({content, type = 'text', editable = false, onChange = (e) => {}}) => {
    return (
        <>
        {
            type == 'text' ? 
            (
                <div id="content">
                  {content}
                </div>
            )
            : (
                type == 'link' ?
                (
                    <span><a href={`https://codingoweb.netlify.app/${content}/profile`} target="_blank" >@{content}</a></span>
                ) : (
                  editable ?
                  (<textarea defaultValue={content} onChange={onChange}></textarea>)
                  :
                  (<textarea readOnly={true} value={content}></textarea>)
                )
            )
        }
        </>
    );
};