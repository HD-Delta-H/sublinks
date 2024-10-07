import express from 'express';
import {
  createBlinkPost,
  // getBlinkPostById,
  // updateBlinkPost,
  // deleteBlinkPost,
  // incrementImpressionCount,
  // incrementEngagementCount,
  // processPayment,
  // getBlinkPostsByCreator,
} from '../services/blinkPost.service';

const router = express.Router();

// Route to create a new BlinkPost
router.post('/create', async (req, res) => {
  try {
    const { 
      title, 
      content, 
      image, 
      premiumTitle, 
      premiumImage,
      premiumContent,
      type,
      price,
      creator,
    } = req.body;

    if (!title || !content || !image || !price || !premiumTitle || !premiumContent || !premiumImage || !type || !creator) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newBlinkPost = await createBlinkPost({
      title: title,
      content: content,
      image: image,
      price: price,
      premiumTitle: premiumTitle,
      premiumContent: premiumContent,
      premiumImage: premiumImage,
      type: type,
      revenue: 0,
      creator: creator,
      impressionCount: 0,
      engagementCount: 0,
      paymentCount: 0,
    });

    return res.status(201).json(newBlinkPost);
  } catch (err) {
    console.error('Error creating Blink Post:', err);
    res.status(500).json(err);
  }
});

// // Route to get a BlinkPost by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const blinkPost = await getBlinkPostById(id);
//     if (!blinkPost) {
//       return res.status(404).json({ message: 'BlinkPost not found' });
//     }
//     return res.status(200).json(blinkPost);
//   } catch (err) {
//     console.error('Error fetching BlinkPost by ID:', err);
//     res.status(500).json(err);
//   }
// });

// // Route to update a BlinkPost
// router.put('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedBlinkPost = await updateBlinkPost(id as any, req.body);
//     if (!updatedBlinkPost) {
//       return res.status(404).json({ message: 'BlinkPost not found' });
//     }
//     return res.status(200).json(updatedBlinkPost);
//   } catch (err) {
//     console.error('Error updating BlinkPost:', err);
//     res.status(500).json(err);
//   }
// });

// // Route to delete a BlinkPost
// router.delete('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     await deleteBlinkPost(id);
//     return res.status(204).send(); // No content
//   } catch (err) {
//     console.error('Error deleting BlinkPost:', err);
//     res.status(500).json(err);
//   }
// });

// // Route to increment the impression count
// router.put('/:id/impressions', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedBlinkPost = await incrementImpressionCount(id as any);
//     if (!updatedBlinkPost) {
//       return res.status(404).json({ message: 'BlinkPost not found' });
//     }
//     return res.status(200).json(updatedBlinkPost);
//   } catch (err) {
//     console.error('Error incrementing impression count:', err);
//     res.status(500).json(err);
//   }
// });

// // Route to increment the engagement count
// router.put('/:id/engagements', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedBlinkPost = await incrementEngagementCount(id as any);
//     if (!updatedBlinkPost) {
//       return res.status(404).json({ message: 'BlinkPost not found' });
//     }
//     return res.status(200).json(updatedBlinkPost);
//   } catch (err) {
//     console.error('Error incrementing engagement count:', err);
//     res.status(500).json(err);
//   }
// });

// // Route to process payment for a BlinkPost
// router.put('/:id/payment', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { paymentAmount } = req.body;
//     if (typeof paymentAmount !== 'number' || paymentAmount <= 0) {
//       return res.status(400).json({ message: 'Invalid payment amount' });
//     }
    
//     const updatedBlinkPost = await processPayment(id as any, paymentAmount);
//     if (!updatedBlinkPost) {
//       return res.status(404).json({ message: 'BlinkPost not found' });
//     }
//     return res.status(200).json(updatedBlinkPost);
//   } catch (err) {
//     console.error('Error processing payment:', err);
//     res.status(500).json(err);
//   }
// });

// // Route to get all BlinkPosts for a specific creator
// router.get('/creator/:creatorId', async (req, res) => {
//   try {
//     const { creatorId } = req.params;
//     const blinkPosts = await getBlinkPostsByCreator(creatorId as any);
//     return res.status(200).json(blinkPosts);
//   } catch (err) {
//     console.error('Error fetching BlinkPosts for creator:', err);
//     res.status(500).json(err);
//   }
// });

export default router;