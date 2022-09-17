import Categorydropdown from './Categorydropdown';

function FilterCategories(props) {
    const categories = [
        {
            name: "fileType-tag",
            fields: ["File Type", "pdf(.pdf)", "powerpoint(.pptx)", "word(.docx)", "video file(.mp4)", "image file(.jpg/png)"]
        },
        {
            name: "lastMod-tag",
            fields: ["Last Modified", "within the last day", "within the last week", "within the last month", "within the last 6 months", "within the last year"]
        }
    ];

  return (
    <div className={props.filterTagsClass}>                     
        <Categorydropdown updateFileTypeFilter={props.updateFileTypeFilter} updateLastModFilter={props.updateLastModFilter}categories={categories} classNameForSelect={"search-tags"} />                
    </div>
  )
}

export default FilterCategories