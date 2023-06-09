import { Box, Link } from "@mui/material"
import { GetCommitsQuery } from "data-access";
import { Table } from "feature-sets";
import GitHubIcon from '@mui/icons-material/GitHub';

interface SearchProps {
  data: GetCommitsQuery
}

const ATTRIBUTES = [
  { name: "sha", title: "Commit", component: (arg: string) => <div>{arg.substring(0, 8)}</div> },
  { title: "Author", name: 'author' },
  { title: "Email", name: 'email' },
  { title: "Description", name: 'description' },
  { title: 'Link', name: 'url', component: (arg: string) => <Link href={arg} width={100} target="_blank"><GitHubIcon /></Link> }
];


const Search = (props: SearchProps) => {
  const { data } = props;
  return (<Box sx={{ display: 'flex' }}>
    <Table data={data} attributes={ATTRIBUTES} />
  </Box>)
}

export default Search;