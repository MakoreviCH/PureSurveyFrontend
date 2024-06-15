import { Dialog, DialogTitle, DialogContent, FormControl, InputLabel, Select, MenuItem, DialogActions, Button } from "@mui/material";
import { useState } from "react";
import { countryList } from "../enums/country-code";
import { CountryCodeList } from "../interfaces/responses/ITargetingResponse";

// Define an interface for the countryList object


interface AddLanguageDialogProps {
  open: boolean;
  onClose: () => void;
  onAddLanguage: (languageCode: string) => void;
  availableLanguages: string[];
}

const AddLanguageDialog: React.FC<AddLanguageDialogProps> = ({ open, onClose, onAddLanguage, availableLanguages }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  const handleAdd = () => {
    if (selectedLanguage && !availableLanguages.includes(selectedLanguage)) {
      onAddLanguage(selectedLanguage);
      setSelectedLanguage('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a New Language</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel id="language-select-label">Language</InputLabel>
          <Select
            labelId="language-select-label"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value as string)}
            renderValue={(value) => 
              `${value} - ${(countryList as CountryCodeList)[value]}` 
            }
          >
            {Object.entries(countryList).map(([code, name]) => (
              <MenuItem key={code} value={code}>
                {`${code} - ${name}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLanguageDialog;