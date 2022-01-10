/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useHistory } from 'react-router';
import { FormProvider, useForm } from 'react-hook-form';
import { useState, useEffect, useCallback } from 'react';
import { Drawer, Note } from '../organisms';
import { apiProvider } from '../../api/providers';
import {
  IngredientType,
  PostRecipeType,
  GetRecipeResult,
  TagType,
  GetTagResult,
  User,
} from '../../api/types';
import { removeEmptyVals } from '../../util/func';

const mainStyle = css`
  height: 100vh;
  @media (min-width: 481px) {
    display: grid;
    grid-template-columns: 240px 1fr;
  }
`;

const drawerClosed = css`
  height: 100vh;
`;

export default function Main(): JSX.Element {
  const methods = useForm({
    defaultValues: {
      title: '',
      contents: '',
      ingredients: [{ isChecked: false, name: '' }] as IngredientType[],
    },
  });

  const history = useHistory();
  const [recipeList, setRecipeList] = useState<GetRecipeResult[]>([]);
  const [recipeID, setRecipeID] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [userTags, setUserTags] = useState<GetTagResult[]>([]);
  const [searchWords, setSearchWords] = useState<string>('');
  const [searchTag, setSearchTag] = useState<string>('');
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showNote, setShowNote] = useState<boolean>(false);

  const handleDrawerOpen = () => {
    setDrawerOpen((prev) => !prev);
  };

  const getAllTags = useCallback(async () => {
    try {
      const query = removeEmptyVals({ title: searchWords });
      const tags = await apiProvider.getTags('tags', query);
      setUserTags(tags);
    } catch (err) {
      alert(err);
      history.push('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchWords]);

  // search condition이 업데이트 되는 조건: 유저가 서치 버튼을 눌렀을때, 태그 클릭했을 때
  const getAllPosts = useCallback(async () => {
    try {
      const searchConditions = {
        title: searchWords,
        tag: searchTag,
      };
      const refinedConditions = removeEmptyVals(searchConditions);
      const result = await apiProvider.getAll('recipes', refinedConditions);
      setRecipeList(result);
    } catch (err) {
      alert(err);
      history.push('/login');
    }
  }, [searchTag, searchWords]);

  const handleCreateNew = () => {
    methods.reset();
    setRecipeID('');
    setTags([]);
    setShowNote(true);
  };

  const handleUpload = async (data: PostRecipeType) => {
    try {
      if (recipeID) {
        await apiProvider.put(`recipes/${recipeID}`, data);
      } else {
        await apiProvider.post('recipes', data);
      }
      await getAllPosts();
      await getAllTags();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await apiProvider.remove('recipes', recipeID);
      await getAllPosts();
      await getAllTags();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRecipeClick = useCallback(
    async (recipeId: number) => {
      try {
        const result = await apiProvider.getSingle('recipes', recipeId);
        const { title, ingredients, contents } = result;
        setRecipeID(result.id);
        methods.setValue('title', title);
        methods.setValue('contents', contents);
        methods.setValue('ingredients', ingredients);
        const tagsList = result.tags.map((tag: TagType) => tag.title);
        setTags(tagsList);
      } catch (err) {
        console.error(err);
      }
    },
    [methods],
  );

  const getUser = async () => {
    const res: User = await apiProvider.getCurrentUser();
    if (!res) history.push('/login');
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      document.body.clientWidth < 481 ? setIsMobile(true) : setIsMobile(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  useEffect(() => {
    getAllPosts();
    getAllTags();
  }, [getAllPosts, getAllTags]);

  useEffect(() => {
    if (recipeList && recipeList[0]) handleRecipeClick(recipeList[0].id);
  }, [handleRecipeClick, recipeList]);

  return (
    <FormProvider {...methods}>
      <div css={drawerOpen ? mainStyle : drawerClosed}>
        <Drawer
          setSearchTag={setSearchTag}
          searchTag={searchTag}
          drawerOpen={drawerOpen}
          onCreateNew={handleCreateNew}
          recipeList={recipeList}
          onRecipeClick={handleRecipeClick}
          searchWords={searchWords}
          setSearchWords={setSearchWords}
          userTags={userTags}
          isMobile={isMobile}
          setShowNote={setShowNote}
          hideDrawer={showNote}
        />
        <Note
          drawerOpen={drawerOpen}
          onExpandClick={handleDrawerOpen}
          onUpload={handleUpload}
          onDelete={handleDelete}
          tags={tags}
          setTags={setTags}
          isMobile={isMobile}
          setShowNote={setShowNote}
          showOnMobile={showNote}
        />
      </div>
    </FormProvider>
  );
}
