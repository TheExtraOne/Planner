import { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from 'src/components/button/Button.tsx';
import CategoriesList from 'src/components/categories/CategoriesList.tsx';
import AddCategoryModal from 'src/components/categories/AddCategoryModal.tsx';
import styles from 'src/pages/CategoriesPage/CategoriesPage.module.css';

const CategoriesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Categories</h1>
        <CategoriesList />
      </div>
      <Button
        variant='icon'
        className={styles.addButton}
        onClick={() => setIsModalOpen(true)}
      >
        <Plus size={24} />
      </Button>
      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CategoriesPage;
