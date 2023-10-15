import {
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ListDrawer } from './list';

interface AccordionSectionProps {
  open: boolean;
  listOfItems: string[];
  listOfIcons: JSX.Element[];
  sectionName: string;
  mainIcon: JSX.Element;
}

export const AccordionSection = ({
  open,
  listOfItems,
  listOfIcons,
  sectionName,
  mainIcon
}: AccordionSectionProps) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={open && <ExpandMoreIcon />}
        aria-controls="first-accordion-content"
        id="first-accordion-header"
      >
        {open ? (
          <>
            {mainIcon}
            <Typography
              paddingX={2}
              sx={{
                fontWeight: 'bold',
                ':hover': {
                  color: '#09f'
                }
              }}
            >
              {sectionName}
            </Typography>
          </>
        ) : (
          mainIcon
        )}
      </AccordionSummary>
      <Divider />
      <AccordionDetails>
        <ListDrawer
          listOfItems={listOfItems}
          open={open}
          icons={listOfIcons}
          sectionName={sectionName}
        />
      </AccordionDetails>
    </Accordion>
  );
};
